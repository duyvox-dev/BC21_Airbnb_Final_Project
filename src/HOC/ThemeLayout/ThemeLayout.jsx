import React, { Fragment } from 'react'
import FooterTemplate from './FooterTemplate/FooterTemplate'
import HeaderTemplate from './HeaderTemplate/HeaderTemplate'

export default function ThemeLayout(props) {
    return (
        <div className='w-full overflow-hidden'>
            <HeaderTemplate />
            <props.Component />
            <FooterTemplate />
        </div>
    )
}
