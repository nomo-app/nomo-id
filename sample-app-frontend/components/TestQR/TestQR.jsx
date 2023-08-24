import React, { useEffect, useState } from 'react'
import QRCodeComponent from "../QRCode/QRCode";
import { useSocket } from "../../hooks/useSocket";

const ignoreOrderCompare = (a, b) => {
    if (a.length !== b.length) return false;
    const elements = new Set([...a, ...b]);
    for (const x of elements) {
        const count1 = a.filter(e => e === x).length;
        const count2 = b.filter(e => e === x).length;
        if (count1 !== count2) return false;
    }
    return true;
}

const TestQR = ({ testcase }) => {

    const { socketResponses, qrLink } = useSocket({ testcase })

    console.log(qrLink)

    const [testcaseStatus, setTestcaseStatus] = useState({
        scanned: '',
        confirmed: '',
        authenticated: ''
    })

    useEffect(() => {
        if (socketResponses?.confirmed && ignoreOrderCompare(Object.keys(socketResponses?.confirmed), testcase.confirmed)) {
            setTestcaseStatus(prevState => {
                return {
                    ...prevState,
                    confirmed: 'success'
                }
            })
        } else if (socketResponses?.confirmed) {
            setTestcaseStatus(prevState => {
                return {
                    ...prevState,
                    confirmed: 'failed'
                }
            })
        }

        if (socketResponses?.scanned && ignoreOrderCompare(Object.keys(socketResponses?.scanned), testcase.scanned)) {
            setTestcaseStatus(prevState => {
                return {
                    ...prevState,
                    scanned: 'success'
                }
            })
        } else if (socketResponses?.scanned) {
            setTestcaseStatus(prevState => {
                return {
                    ...prevState,
                    scanned: 'failed'
                }
            })
        }
    }, [socketResponses])

    return (
        <div id='TestQR'>
            <div className="name">{testcase.name}</div>
            <div className="test-container">
                <QRCodeComponent link={qrLink} />
                <div className="expected">
                    <span>Expected Returns</span>
                    <div className={"scanned " + testcaseStatus.scanned}>
                        <span>Scanned</span>
                        <div>
                            {
                                testcase.scanned.map((element, index) => {
                                    return (
                                        <span className="scan-return">
                                            {element}{index !== testcase.scanned.length - 1 && ', '}
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={"confirmed " + testcaseStatus.confirmed}>
                        <span>Confirmed</span>
                        <div>
                            {
                                testcase.confirmed.map((element, index) => {
                                    return (
                                        <span className="confirm-return">
                                            {element}{index !== testcase.confirmed.length - 1 && ', '}
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="authorized">
                        <span>Authorization</span>
                        <div>
                            {testcase.authorization ? 'SUCCESS' : 'FAILED'}
                        </div>
                    </div>
                </div>
                <div className="received">
                    <span>Received Returns</span>
                    <div className={"scanned " + testcaseStatus.scanned}>
                        <span>Scanned</span>
                        <div>
                            {
                                socketResponses.scanned &&
                                Object.keys(socketResponses?.scanned).map((element, index) => {
                                    return (
                                        <span className="scan-return">
                                            {element}{index !== Object.keys(socketResponses?.scanned).length - 1 && ', '}
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={"confirmed " + testcaseStatus.confirmed}>
                        <span>Confirmed</span>
                        <div>
                            {
                                socketResponses.confirmed && !socketResponses?.verification_failed &&
                                Object.keys(socketResponses?.confirmed).map((element, index) => {
                                    return (
                                        <span className="confirm-return">
                                            {element}{index !== Object.keys(socketResponses?.confirmed).length - 1 && ', '}
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="authorized">
                        <span>Authorization</span>
                        <div>
                            {(socketResponses?.confirmed && socketResponses?.confirmed?.verification_failed) ?
                                'FAILED' : (socketResponses?.confirmed && 'SUCCESS')}
                        </div>
                    </div>
                </div>
                {
                    socketResponses.confirmed &&
                    <div className="prettyjson">
                        <pre>{JSON.stringify(socketResponses.confirmed, null, 4)}</pre>
                    </div>
                }
            </div>
            <a href={qrLink}>{qrLink}</a>
        </div>
    )
}

export default TestQR