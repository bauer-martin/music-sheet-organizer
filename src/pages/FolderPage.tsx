import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import { Chip, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Fragment, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useRouting } from '../contexts/routing'
import { dataSet } from '../dataSet'
import { PageLayout } from '../PageLayout'

export function FolderPage() {
    const { t } = useTranslation()
    const { setRoute } = useRouting()

    const folders = useMemo(
        () =>
            Array.from(dataSet.values(), folder => ({
                key: folder.key,
                title: folder.title,
                sheetCount: folder.sheets.length,
            })).sort((a, b) => a.title.localeCompare(b.title)),
        []
    )

    return (
        <PageLayout>
            <List disablePadding>
                {folders.map((folder, index) => (
                    <Fragment key={folder.key}>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => setRoute({ path: 'data/folders/:folder', folderId: folder.key })}
                            >
                                <ListItemText primary={folder.title} />
                                <Chip size="small" label={t('itemCount', { count: folder.sheetCount })} />
                                <ChevronRightRoundedIcon color="action" />
                            </ListItemButton>
                        </ListItem>
                        {index < folders.length - 1 && (
                            <Divider component="li" variant="inset" sx={{ marginInlineStart: 2 }} />
                        )}
                    </Fragment>
                ))}
            </List>
        </PageLayout>
    )
}
