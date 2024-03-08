import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

export default function SignOutDialog({ open, handleClose }) {
  const handleSignOut = () => {
    // Perform sign-out logic here
    handleClose(); // Close the dialog after signing out
  };

  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader>Sign Out? </DialogHeader>
      <DialogBody>
        Sad to see you go. Are you sure you want to sign out?
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={handleClose} className="mr-1">
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleSignOut}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
