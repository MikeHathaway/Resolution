import React from 'react';
import { Action } from '../../Store/actions'
import styled from 'styled-components'

type CheckBalanceProps = {
	checkBalance: any,
	mintTokens: any
}

interface IButton {
	selected?: boolean
  }

const Button = styled.button<IButton>`
	background: transparent;
	border-radius: 3px;
	border: 2px solid palevioletred;
	color: palevioletred;
	margin: 0.5em 1em;
	padding: 0.25em 1em;


`

// ${(props: any) => props.selected`
// background: palevioletred;
// color: white;
// `}

export default function CheckBalance({checkBalance, mintTokens}: CheckBalanceProps){
	return (
		<Button
			onClick={() => {
				mintTokens()
				checkBalance()
			}} 
			// className={styles.checkBalance}
		>
		{/* Listen for mint contract event */}
			Check Your Token Balance
		</Button>	
	)
}
