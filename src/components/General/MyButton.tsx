import * as React from 'react';
import {Button, ButtonProps} from 'react-native';

export interface Props {
  //name: string;
  buttonProps: ButtonProps;
}

const MyButton: React.FC<Props> = props => {
  return <Button {...props.buttonProps} />;
};

export default MyButton;
