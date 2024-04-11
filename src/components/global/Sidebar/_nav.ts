import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';

const _nav = [
  {
    text: 'Account',
    icon: ContactEmergencyIcon,
    children: [
      {
        text: 'Profile',
        icon: ContactEmergencyIcon,
        link: '/profile'
      }
    ]
  },
  {
    text: 'Users',
    icon: ContactEmergencyIcon,
    children: [
      {
        text: 'Users',
        icon: ContactEmergencyIcon,
        link: '/users'
      },
      {
        text: 'Add User',
        icon: ContactEmergencyIcon,
        link: '/users/add'
      }
    ]
  },
  {
    text: 'Orders',
    icon: ContactEmergencyIcon,
    children: [
      {
        text: 'Orders',
        icon: ContactEmergencyIcon,
        link: '/orders'
      },
      {
        text: 'Create Order',
        icon: ContactEmergencyIcon,
        link: '/orders/create'
      }
    ]
  },
  {
    text: 'Clients',
    icon: ContactEmergencyIcon,
    children: [
      {
        text: 'Clients',
        icon: ContactEmergencyIcon,
        link: '/clients'
      },
      {
        text: 'Add Client',
        icon: ContactEmergencyIcon,
        link: '/clients/add'
      }
    ]
  },
  {
    text: 'Vendors',
    icon: ContactEmergencyIcon,
    children: [
      {
        text: 'Vendors',
        icon: ContactEmergencyIcon,
        link: '/vendors'
      },
      {
        text: 'Add Vendor',
        icon: ContactEmergencyIcon,
        link: '/vendors/add'
      }
    ]
  }
];

export default _nav;
