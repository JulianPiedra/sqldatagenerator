import Swal from 'sweetalert2';

//Shows a card in the bottom right corner with an error message
export default function ShowError(message: string) {
  Swal.fire({
    icon: 'error',
    text: message,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 4000,
    background: '#ff0039',
    color: '#ffffff',
    toast: true,
    customClass: {
      popup: 'popup',
    }
  })
}
