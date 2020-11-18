import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import AdbIcon from '@material-ui/icons/Adb';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import Label from '@material-ui/icons/Label';
import Tab from './components/transactions/Tab';

const operations = [
  {
    name: 'Just',
    icon: AcUnitIcon,
    render: Tab,
    color: 'blue',
  },

  {
    name: 'Random',
    icon: AccessAlarmIcon,
    render: Tab,
    color: 'purple',
  },
  {
    name: 'Things',
    icon: Label,
    nested: [
      {
        name: 'To',
        icon: AdbIcon,
        render: Tab,
        color: 'green',
      },

      {
        name: 'Render',
        icon: AirportShuttleIcon,
        render: Tab,
        color: 'red',
      },
    ],
  },
];

export default operations;
