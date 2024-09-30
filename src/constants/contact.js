import { v4 as uuidv4 } from 'uuid'
import { imageIcon } from './image-icon';

export const CONTACT = {
  detail: 'ContaLorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore nobis aspernatur obcaecati pariatur labore eaque at consectetur laborum, dolor eveniet. A nobis quam illum ut quibusdam. Provident vero impedit recusandae deserunt, dolor omnis fugit!',
  phone: '+66-2345-6789',
  email: 'contact@tomato.com',
  address: '123 Main Street, Bangkok, Thailand',
};

export const SOCIAL = [
  {
    id: uuidv4(),
    link: '#',
    icon: imageIcon.facebook_icon,
  },
  {
    id: uuidv4(),
    link: '#',
    icon: imageIcon.twitter_icon,
  },
  {
    id: uuidv4(),
    link: '#',
    icon: imageIcon.linkedin_icon,
  },
]

export const COPYRIGHT = `${new Date().getFullYear()} newpk. Built with ♡ using ReactJS. All rights reserved.`;