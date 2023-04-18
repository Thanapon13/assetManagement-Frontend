import Swal from "sweetalert2";

const ModalWarning = ({ message,didClose }) => {

    Swal.fire({
        icon: "warning",
        // title: '',
        text: message,
        showCloseButton: true,
        confirmButtonColor: "#38821D",
        didClose: didClose
    })

}

export default ModalWarning