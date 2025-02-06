import './Footer.css';

export default function Footer () {
    const year = new Date().getFullYear();

    return (
        <footer className='footer p-1'>
        <p>&copy; {year} Zdeněk Barth</p>
        </footer>
    );
};  