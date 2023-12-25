
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {PropTypes} from 'prop-types'

const DeleteAccountModal = (props) => {
    let showDeleteModal = props.showDeleteModalProps
    const handleConfirmDelete = props.conFirmDeleteFunc
    const CloseFunc = props.cancelDeleteFunc
    return (
        <Modal show={showDeleteModal} size="md" onClose={CloseFunc} popup className=" pt-[250px] md:pt-0">
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto my-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Bạn có chắc chắn muốn xóa dữ liệu này ?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={handleConfirmDelete}>
                        {"Có"}
                        </Button>
                        <Button color="gray" onClick={CloseFunc}>
                        Không
                        </Button>
                    </div>
                </div>
            </Modal.Body>
      </Modal>

    )
}
DeleteAccountModal.propTypes = {
    // showDeleteModalProps: PropTypes.object.isRequired,
    conFirmDeleteFunc: PropTypes.func.isRequired,
    cancelDeleteFunc: PropTypes.func.isRequired
}
export default DeleteAccountModal