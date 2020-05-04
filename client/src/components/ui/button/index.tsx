import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { Button as MatUIButton, ButtonProps as MatUIButtonProps } from '@material-ui/core'

// const ButtonWrapper = styled.button`
//     border-radius: 8px;
//     padding: 14px 12px;
// `

interface ButtonProps extends MatUIButtonProps {}

const Button: React.FC<ButtonProps> = (props) => {
    const { className = '', children, ...rest } = props

    return (
        <MatUIButton {...rest} className={`${classnames('Button', className)}`}>
            {children}
        </MatUIButton>
    )
}

export default Button
