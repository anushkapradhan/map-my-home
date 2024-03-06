import React, { useState } from 'react';
import { EyeIcon, PhoneIcon, PencilSquareIcon, BuildingOffice2Icon, UserIcon,} from '@heroicons/react/24/solid';
import { Card, Avatar, List, ListItem, ListItemPrefix, } from "@material-tailwind/react";


export default function Profile2() {
  return(
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="text-center mb-5 mt-7">
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="avatar" size="lg" />
        <div className="font-semibold mt-2 text-blue-gray-900">Ian George</div>
      </div>
      <List>
        <ListItem >
          <ListItemPrefix>
            <UserIcon className="h-5 w-5" />
          </ListItemPrefix>
          Edit Profile
        </ListItem>
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
