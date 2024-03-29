import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';

const _nav = [
  {
    text: 'Booking',
    icon: ContactEmergencyIcon,
    children: [
      {
        text: 'Consultation',
        icon: ContactEmergencyIcon,
        link: '/students'
      },
      {
        text: 'Labs Appointment',
        icon: ContactEmergencyIcon,
        link: '/add-student'
      }
    ]
  },
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
    text: 'Vectors',
    icon: ContactEmergencyIcon,
    children: [
      {
        text: 'Vectors',
        icon: ContactEmergencyIcon,
        link: '/vectors'
      },
      {
        text: 'Add Vectors',
        icon: ContactEmergencyIcon,
        link: '/vectors/add'
      }
    ]
  }
];

export default _nav;
