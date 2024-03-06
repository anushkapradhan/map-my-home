import React, { useState } from 'react';
import { EyeIcon, PhoneIcon, PencilSquareIcon, BuildingOffice2Icon, UserIcon,} from '@heroicons/react/24/solid';
import { Card, Avatar, List, ListItem, ListItemPrefix, } from "@material-tailwind/react";

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile2() {
    const { currentUser } = useSelector((state) => state.user);
  return(
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="text-center mb-5 mt-7">
        <Avatar src={currentUser.avatar} alt="avatar" size="lg" />
        <div className="font-semibold mt-2 text-blue-gray-900">{currentUser.username}</div>
      </div>
      <List>

      <Link to={'/Profile'}>
        <ListItem >
          <ListItemPrefix>
            <UserIcon className="h-5 w-5" />
          </ListItemPrefix>
          Edit Profile
        </ListItem>
        </Link>

        <ListItem>
          <ListItemPrefix>
            <EyeIcon className="h-5 w-5" />
          </ListItemPrefix>
          Viewed Properties
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <PhoneIcon className="h-5 w-5" />
          </ListItemPrefix>
          Contacted Prperties
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <BuildingOffice2Icon className="h-5 w-5" />
          </ListItemPrefix>
          Your Listings
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <PencilSquareIcon className="h-5 w-5" />
          </ListItemPrefix>
          Create Listings
        </ListItem>

      </List>
    </Card>
  );
}