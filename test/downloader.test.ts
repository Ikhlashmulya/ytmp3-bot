import {download} from "../src/downloader";

describe("downloader test", () => {

	it("should downloded successfully", async () => {
		const fileName = await download("5tABGeWbVtQ")
		expect(fileName).toBeDefined();
	})

})
