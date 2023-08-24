import React from 'react'

const Content = ({flex, children}) => {
    return(
        <div id='content' className={"content " + (flex ? 'flex' : '')}>
            {children}
        </div>
    )
}

export default Content