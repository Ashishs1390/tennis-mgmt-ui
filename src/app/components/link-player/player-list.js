import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
import PlayersTable from './player-table';
import Button from '@mui/material/Button';

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";


function ContactsList(props) {
  const dispatch = useDispatch();
  const contacts = useMemo(()=> props.searchedPlayerListNew

  , [props.searchedPlayerListNew]);
  // const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText)
  // const user = useSelector(({ contactsApp }) => contactsApp.user);

  const [filteredData, setFilteredData] = useState(null);
  const handleToggle = (value) => {
    props.handleToggle(value);
  }

  const getPlayerItnLevel = (email) => {
    props.getPlayerItnLevel(email);
  }

  const columns = useMemo(
    () => [
      {
        Header: ({ selectedFlatRows }) => {
          const selectedRowIds = selectedFlatRows.map((row) => row.original.id);

          return (
            selectedFlatRows.length > 0 && (
                <span></span>
            //   <ContactsMultiSelectMenu selectedContactIds={selectedRowIds} />
            )
          );
        },
        accessor: 'avatar',
        Cell: ({ row }) => {
          return <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
        },
        className: 'justify-center',
        width: 64,
        sortable: false,
      },
      {
        Header: 'First Name',
        accessor: 'first_name',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Email',
        accessor: 'email',
        sortable: true,
      },
      {
        id: 'action',
        width: 128,
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <Button onClick = {() => getPlayerItnLevel(row.original.email) }>view player</Button>
            {/* <FormControlLabel
                value={row.original.email}
                onChange={handleToggle.bind(this, row.original.email)}
                inputprops={{ "aria-labelledby": row.original.email  }}
                control={<Radio />}
                label=""
                            /> */}
          </div>
        ),
      },
    ],
    [dispatch]
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return contacts;
      }
      return FuseUtils.filterArrayByString(contacts, _searchText);
    }

    if (contacts) {
      setFilteredData(getFilteredArray(contacts, ''));
    }
  }, [contacts]);

  if (!filteredData) {
    return null;
  }

  // if (filteredData.length === 0) {
  //   return (
  //     <div className="flex flex-1 items-center justify-center h-full">
  //       <Typography color="textSecondary" variant="h5">
  //         There are no contacts!
  //       </Typography>
  //     </div>
  //   );
  // }


  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="flex flex-auto children-section"
    >
      <RadioGroup
                aria-label="gender"
                defaultValue="0"
                name="radio-buttons-group"
                className="displaylist-home"
                
              >
      <PlayersTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            // dispatch(openEditContactDialog(row.original));
          }
        }}
      />
      </RadioGroup>
    </motion.div>
  );
}

export default ContactsList;
