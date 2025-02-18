import emailjs from '@emailjs/browser';

export const SendEmail = async (email: string) => {
    try {
        const result = await emailjs.send(
            'service_4hbjnsj', 
            'template_8jnal0t', 
            {
                to_email: email, 
            },
            'FGGz3ro7JZT5YbNFe' 
        );
        return result;
    } catch (error) {
        throw error;
    }
};