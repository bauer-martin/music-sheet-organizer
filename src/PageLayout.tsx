import { Box, type CreateSlotsAndSlotProps, Toolbar } from '@mui/material'
import type { ComponentType, PropsWithChildren } from 'react'

import { Header, type HeaderProps } from './components/Header'
import { TabBar } from './components/TabBar'

export function PageLayout({
    slots,
    slotProps,
    children,
}: CreateSlotsAndSlotProps<{ header: ComponentType<HeaderProps> }, { header: HeaderProps }> & PropsWithChildren) {
    const HeaderSlot = slots?.header ?? Header
    const headerProps = slotProps?.header ?? {}
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                inset: 0,
            }}
        >
            <HeaderSlot {...headerProps} />
            <Toolbar variant="dense" />
            <Box sx={{ flex: 1, overflow: 'auto', isolation: 'isolate' }}>{children}</Box>
            <TabBar />
        </Box>
    )
}
