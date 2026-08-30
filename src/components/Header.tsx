import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { type Route, useRouting } from '../contexts/routing'

export type HeaderProps = {
    backTo?: Route
    title?: string
    trailingAccessory?: ReactNode
}

export function Header({ backTo, title, trailingAccessory }: HeaderProps) {
    const { t } = useTranslation()
    const { setRoute } = useRouting()
    return (
        <AppBar elevation={0} sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
            <Toolbar variant="dense" disableGutters sx={{ paddingInline: 2 }}>
                {backTo && (
                    <IconButton edge="start" color="inherit" onClick={() => setRoute(backTo)}>
                        <ChevronLeftRoundedIcon />
                    </IconButton>
                )}
                <Typography variant="h6">{title ?? t('header.title')}</Typography>
                <Box sx={{ flex: 1 }} />
                {trailingAccessory}
            </Toolbar>
        </AppBar>
    )
}
