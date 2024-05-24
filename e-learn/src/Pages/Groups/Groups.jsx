 import classes from './groups.module.css';

import Group from '../../Components/Group/group';

import { useNavigate } from 'react-router-dom';

//import { group } from './GroupData';

import { httpRequest } from '../../HTTP';

import VotingModal from '../../Components/Voting/VotingModal'; // Import VotingModal

import { useEffect, useState } from 'react';

import { getAuthToken } from '../../Helpers/AuthHelper';

export default function Groups({ selectedGroupId, onGroupSelect }) {

  const navigate = useNavigate();

  const [selectedGroup, setSelectedGroup] = useState(null); // Add state for selected group

  const [group, setGroup] = useState([]); // Initialize group state



  function handleGroupClick(id){

    navigate(`/groups/${id}`);

    const selected = group.find(group => group.id === id);

    setSelectedGroup(selected); // Set selected group

  };



  async function fetchGroups() {

    try {

      const token = getAuthToken();

      const response = await httpRequest('GET', 'https://elearnapi.runasp.net/api/Group/GetUserGroups', token);

      if (response.statusCode === 200) {

        console.log('Groups fetched successfully');

        console.log(response);

        setGroup(response.data);

      } else {

        console.log(response);

      }

    } catch (error) {

      console.log('An error occurred:', error);

    }



  }

  useEffect(() => {

    fetchGroups(); // Call fetchGroups when the component mounts

  }, []);



  return (

    <ul className={classes.classes}>

      {group.map((item, index) => (

        <Group

          key={index}

          subTitle={item.name}

          insName={item.instructorName}

          onClick={() => {

            handleGroupClick(item.id);

            onGroupSelect(item.id);

          }}// Ensure onClick is properly handled

        />

      ))}

      {selectedGroup && <VotingModal selectedGroup={selectedGroup} />} {/* Pass selected group to VotingModal */}

    </ul>

  );

}