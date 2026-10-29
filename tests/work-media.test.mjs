import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';
const works = JSON.parse(await readFile(new URL('../app/trabalhos.json', import.meta.url), 'utf8'));
const output = new URL('../out/', import.meta.url);

test('selected card media is present in the static export', async () => {
  assert.equal(works.filter(work => work.kind === 'video').length, 10);
  assert.equal(new Set(works.map(work => work.id)).size, works.length);
  for (const work of works) for (const path of [work.poster, work.src].filter(Boolean)) {
    const file = await stat(new URL(`.${path}`, output));
    assert.ok(file.size > 0 && file.size < 10 * 1024 * 1024, path);
  }
});

test('videos are silent inline loops inside service cards, with no gallery or player controls', async () => {
  const html = await readFile(new URL('index.html', output), 'utf8');
  const videos = [...html.matchAll(/<video\b[^>]*>/g)].map(match => match[0]);
  assert.ok(videos.length >= 10);
  for (const tag of videos) {
    assert.ok(tag.includes('loop'));
    assert.ok(tag.includes('muted'));
    assert.ok(tag.includes('playsInline') || tag.includes('playsinline'));
    assert.ok(!tag.includes('controls'));
    assert.ok(tag.includes('preload="none"'));
  }
  assert.ok(!html.includes('id="trabalhos"'));
  assert.ok(!html.includes('Ver mais trabalhos'));
});
