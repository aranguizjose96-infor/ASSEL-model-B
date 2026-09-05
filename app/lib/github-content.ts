import type { EditableSiteContent } from './content';

const apiBase = 'https://api.github.com';

function configuration() {
  const token = process.env.GITHUB_CONTENT_TOKEN;
  if (!token) throw new Error('Falta configurar GITHUB_CONTENT_TOKEN en Vercel.');
  return {
    token,
    owner: process.env.GITHUB_CONTENT_OWNER || 'aranguizjose96-infor',
    repo: process.env.GITHUB_CONTENT_REPO || 'ASSEL-model-B',
    branch: process.env.GITHUB_CONTENT_BRANCH || 'main',
    path: process.env.GITHUB_CONTENT_PATH || 'content/site-content.json',
  };
}

function hasGitHubToken() {
  return Boolean(process.env.GITHUB_CONTENT_TOKEN);
}

async function githubFetch(path: string, init?: RequestInit) {
  const config = configuration();
  const response = await fetch(`${apiBase}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { message?: string };
    const error = new Error(body.message || `GitHub respondió con estado ${response.status}`) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }
  return response;
}

export async function readGitHubContent(ref?: string) {
  if (!hasGitHubToken() && process.env.NODE_ENV !== 'production') {
    const { readFile } = await import('node:fs/promises');
    const { join } = await import('node:path');
    const raw = await readFile(join(process.cwd(), 'content', 'site-content.json'), 'utf8');
    return { content: JSON.parse(raw) as EditableSiteContent, sha: 'local-preview' };
  }
  const config = configuration();
  const query = new URLSearchParams({ ref: ref || config.branch });
  const response = await githubFetch(`/repos/${config.owner}/${config.repo}/contents/${config.path}?${query}`);
  const data = await response.json() as { content: string; encoding: string; sha: string };
  if (data.encoding !== 'base64') throw new Error('GitHub entregó el contenido en un formato inesperado.');
  const content = JSON.parse(Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf8')) as EditableSiteContent;
  return { content, sha: data.sha };
}

export async function writeGitHubContent(content: EditableSiteContent, expectedSha: string, message: string) {
  const config = configuration();
  const response = await githubFetch(`/repos/${config.owner}/${config.repo}/contents/${config.path}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: Buffer.from(`${JSON.stringify(content, null, 2)}\n`, 'utf8').toString('base64'),
      sha: expectedSha,
      branch: config.branch,
    }),
  });
  const data = await response.json() as { commit: { sha: string; html_url: string }; content: { sha: string } };
  return { commitSha: data.commit.sha, commitUrl: data.commit.html_url, contentSha: data.content.sha };
}

export async function readContentHistory() {
  if (!hasGitHubToken() && process.env.NODE_ENV !== 'production') return [];
  const config = configuration();
  const query = new URLSearchParams({ path: config.path, sha: config.branch, per_page: '12' });
  const response = await githubFetch(`/repos/${config.owner}/${config.repo}/commits?${query}`);
  const commits = await response.json() as Array<{ sha: string; html_url: string; commit: { message: string; author: { name: string; date: string } } }>;
  return commits.map((item) => ({ sha: item.sha, url: item.html_url, message: item.commit.message, author: item.commit.author.name, date: item.commit.author.date }));
}
