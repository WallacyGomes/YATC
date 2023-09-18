export default function presentation() {
    const div = document.querySelector('.presentation');
    setInterval( () => {
        div.style.display = 'none';
    }, 3000)
}