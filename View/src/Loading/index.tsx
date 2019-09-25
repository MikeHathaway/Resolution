// import { Loader } from 'rimble-ui';
const { Loader } = require('rimble-ui');
import React from 'react';
import styled from 'styled-components'

type LoadingProps = {
    isLoading: any
}

interface ILoadingSpinner {
	Loading?: boolean
  }

const Button = styled.div<ILoadingSpinner>`
	background: transparent;
	border-radius: 3px;
	border: 2px solid palevioletred;
	color: palevioletred;
	margin: 0.5em 1em;
	padding: 0.25em 1em;
`

export default function Loading ({isLoading}: LoadingProps) {
    if (isLoading){
        return (
            <Loader 
                color="blue"
                size="80px"
            />
        )
    }
    else {
        return null;
    }
}

