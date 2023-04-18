import Swal from "sweetalert2";

const ModalError = ({ message, didClose }) => {

    Swal.fire({
        icon: "error",
        // title: 'Error',
        text: message,
        showCloseButton: true,
        // showConfirmButton: false,
        confirmButtonColor: "#38821D",
        didClose: didClose
    })

}

export default ModalError