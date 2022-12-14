import { Box, Button, CircularProgress, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import { ISharedLink } from './ProfileShareTab';
import moment from 'moment';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import { generateDocumentLink } from '../../utils';

interface ManageDocumentShareTabPanelProps {
    handleChangeTab:(event:React.SyntheticEvent, newValue:number) => void;
    loading:boolean;
    sharedLinks:ISharedLink[];
    handleOpenModal:(docLink:string)=>void;
    deleteLink:(linkToken:string) => Promise<void>
}

interface DocumentLinkItemComponentProps {
    key:string;
    linkItem:ISharedLink;
    handleOpenModal:(docLink:string)=>void;
    docLink:string;
    deleteLink:(linkToken:string) => Promise<void>;
}

export const ManageDocumentShareTabPanel = (props: ManageDocumentShareTabPanelProps) => {

    const {
        handleChangeTab,
        loading,
        sharedLinks,
        handleOpenModal,
        deleteLink
    } = props

    return (
        <Box style={{
            margin: '10px',
            display:"flex",
            flexDirection:"column",
        }}>
            <Box style={{
                flexDirection:"row",
                display:"flex",
                alignItems:"center",
                margin:'10px',
                marginLeft:0
            }}>
                <Typography
                fontWeight={'bold'}
                >Current Document Shares</Typography>
                <Button
                style={{
                    width:'150px',
                    marginLeft:'10px'
                }}
                onClick={(event)=>handleChangeTab(event, 1)}
                variant="contained">
                    + Add a share
                </Button>
                </Box>
            <Typography>
            Listed below are your currently active document sharing links. You can
            share or delete them.
            </Typography>
            {
                loading?
                <CircularProgress />:null
            }

            {
                sharedLinks.length?sharedLinks.map((item,index) => {
                    return <LinkItemComponent
                    handleOpenModal={handleOpenModal}
                    key={item._id} 
                    linkItem={item}
                    docLink={generateDocumentLink({
                        linkToken: item.token,
                      })}
                    deleteLink={deleteLink}
                    />
                }):null
            }
        </Box>
    );
};

function LinkItemComponent(props:DocumentLinkItemComponentProps){

    const {
        linkItem,
        key,
        handleOpenModal,
        docLink,
        deleteLink
    } = props
    return (
        <Box
        key={key}
        style={{
            margin:'10px',
            marginTop:'40px'
        }}
        >
            <Typography
            fontWeight={"bold"}
            >{linkItem.memo}</Typography>
            <Box style={{
                flexDirection:"row",
                display:'flex',
                alignItems:"center"
            }}>
                <Box>
                <Typography>
                    Created at: {moment(linkItem.createdAt).format('MMMM DD YYYY, hh:mm')}
                </Typography>
                <Typography>
                Expires:{' '}
                {+linkItem.expiration !== -1
                ? moment(linkItem.expiration).format('MMMM DD YYYY hh:mm')
                : ''}
                </Typography>
                </Box>

                <Box marginLeft={'50px'}>
                    <IconButton onClick={()=>handleOpenModal(docLink)} color='inherit'>
                    <QrCode2Icon fontSize='large'/>
                    </IconButton>
                    <IconButton onClick={()=> navigator.clipboard.writeText(docLink)} color='inherit'>
                    <DescriptionIcon fontSize='large'/>
                    </IconButton>
                    <IconButton onClick={()=>deleteLink(linkItem.token)} color='inherit'>
                    <DeleteIcon fontSize='large'/>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}
