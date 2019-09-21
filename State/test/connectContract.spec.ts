import { expect } from "chai";
import mocha from 'mocha';
import { Event } from "ethers";
import { BigNumber } from "ethers/utils";
import { arrayify } from "ethers/utils/bytes";

import { getTestSigner } from "./ethers";
import { Resolution } from "../types/ethers-contracts/Resolution";
import { ResolutionFactory } from "../types/ethers-contracts/ResolutionFactory";

import connectToContract  from "../library/connectContract";

describe("connect to Resolution", () => {
	function deployResolution(): Promise<Resolution> {
		const factory = new ResolutionFactory(getTestSigner());
		//return factory.deploy(0);
		return factory.deploy();
	}

	it("should connect with mocks", async () => {
		const contract = await deployResolution();

		const res = await contract.functions.createResolution(
				"name",
				 Math.floor(Math.random()*1000).toString(), 
				'0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF', 
				'0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF', 
				'0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF',
				{value: 10000}
		);

		expect(res).to.be.deep.eq([new BigNumber("0"), new BigNumber("5")]);
	});


	it("should connect to local node", async () => {
		const contract = await connectToContract();
		
		const res = await contract.functions.createResolution(
				"name",
				 Math.floor(Math.random()*1000).toString(), 
				'0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF', 
				'0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF', 
				'0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF',
				{value: 10000}
		);

		expect(res).to.be.deep.eq([new BigNumber("0"), new BigNumber("5")]);
	});
})

