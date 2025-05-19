import logoIcon from "../assets/img/logoIcon.png";

export const Logo = () => {
    const styles = {
        mobileLogoContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            marginBottom: '20px',
            marginLeft: '10px',
            marginTop: '20px',
        },

        mobileLogo: {
            width: '40px',
        },

        mobileLogoText: {
            fontSize: '15px',
            fontWeight: 'bold',
            color: '#374151',
            marginTop: '5px',
            marginLeft: '3px',
        }
    }
    return (
        <div style={styles.mobileLogoContainer}>
            <img style={styles.mobileLogo} src={logoIcon} alt="" />
            <div style={styles.mobileLogoText}>Rasa Kata</div>
        </div>
    );
}