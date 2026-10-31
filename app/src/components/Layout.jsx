import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './Layout.css';

export default function Layout() {
  return (
    <div id="halaman-utama" className="kerangka">
      <header className="kepala">
        <strong>Portofolio Proyek</strong>
        <Navbar />
      </header>
      <main className="isi">
        <Outlet />
      </main>
      <footer id="footer-utama" className="kaki">Ujian Tengah Semester Pengembangan Aplikasi Web</footer>
    </div>
  );
}