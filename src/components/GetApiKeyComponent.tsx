import "../css/ApiKeyComponent.css"
import Swal from "sweetalert2";
import { SendEmail } from "../services/EmailSender";
import 'remixicon/fonts/remixicon.css';

export default function GetApiKeyComponent() {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = form.elements[0] as HTMLInputElement;
        const response = await SendEmail(email.value);  // Call the SendEmail service

        // Show success or error message based on the response
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: "API key sent to your email",
                timer: 3000,
                showConfirmButton: false,
            });
            form.reset();
        }
        else {
            Swal.fire({
                icon: 'error',
                title: "Failed to send the API KEY",
                timer: 3000,
                showConfirmButton: false,
            });
        }
    }

    return (
        <>
            <h1 className="api-header">
                Want to use our <a target="_blank" href="https://sqldatageneratorapi.runasp.net/swagger/index.html">API</a>?
            </h1>
            <form onSubmit={handleSubmit}>
                <p>Enter your email to get an API key</p>
                <input type="email" name="email" placeholder="Enter your email" required />
                <button type="submit" className="submit"><i className="ri-mail-send-line"></i></button>
            </form>
            
        </>
    );
}
