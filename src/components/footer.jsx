import Icon from "./icons";

const Footer = () => {
    return (
        <div className="footer">
            <a href="https://github.com/kaimunlau/waitforit" target="_blank" className="footer-group" rel="noreferrer">
                <h3>Fork me on GitHub</h3>
                <Icon icon='github' />
            </a>
            <a href="https://www.davidlau.dev/" target="_blank" className="footer-group" rel="noreferrer">
                <h3>More from me</h3>
                <Icon icon='rocket' />
            </a>
        </div>
    );
};

export default Footer;