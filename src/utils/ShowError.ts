import Swal from 'sweetalert2';

export default function ShowError(message: string) {
  Swal.fire({
    icon: 'error',
    text: message,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 4000,
    background: '#ff0039',
    color: '#ffffff',
    backdrop: false,
    toast: true,
    customClass: {
      popup: 'popup',
    }
  })
}
