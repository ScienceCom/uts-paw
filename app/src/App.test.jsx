import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, expect, test, vi } from 'vitest';
import App from './App.jsx';

const DATA_MOCK = [
  { id: "1",
    judul: "Proyek-Pengembangan-Aplikasi-Mobile",
    kategori: "Mobile App",
    teknologi: "kotlin",
    tahun: "2026",
    tautan: "https://github.com/ScienceCom/Proyek-Pengembangan-Aplikasi-Mobile" },
  { id: "2",
    judul: "Pengembangan-WEB-Parkir-Bandung",
    kategori: "WebGIS",
    teknologi: "Python",
    tahun: "2026",
    tautan: "https://github.com/DaffaDesuandi2/Pengembangan-WEB-Parkir-Bandung" }
];

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(DATA_MOCK))));
});

function renderDenganRouter(path) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

test('rute tidak dikenal menampilkan 404', () => {
  renderDenganRouter('/tidak-ada');
  expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
});

test('menampilkan judul halaman di Beranda', async () => {
  renderDenganRouter('/');
  expect(await screen.findByRole('heading', { name: /Portofolio Proyek/i })).toBeInTheDocument();
});

test('menampilkan data hasil fetch di halaman koleksi', async () => {
  renderDenganRouter('/koleksi');
  expect(await screen.findByText('Proyek-Pengembangan-Aplikasi-Mobile')).toBeInTheDocument();
});

test('form halaman tambah memiliki input judul dan tombol simpan', async () => {
  renderDenganRouter('/tambah');
  expect(await screen.findByLabelText(/Judul/i)).toBeInTheDocument();
  expect(await screen.findByRole('button', { name: /Simpan/i })).toBeInTheDocument();
});

test('merender tabel elemen pada halaman statistik', async () => {
  renderDenganRouter('/statistik');
  expect(await screen.findByRole('table')).toBeInTheDocument();
});

test('menampilkan identitas NIM di halaman tentang', async () => {
  renderDenganRouter('/tentang');
  expect(await screen.findByText(/123140129/i)).toBeInTheDocument();
});