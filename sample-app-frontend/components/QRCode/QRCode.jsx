import React from 'react'
import QRCode from 'react-qr-code';

const QRCodeComponent = ({ link }) => {
    return (
        <div id='QRCode'>
            <QRCode value={link} bgColor={'transparent'} size={350} />
        </div>
    )
}

export default QRCodeComponent