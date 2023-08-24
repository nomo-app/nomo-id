import {NextSeo} from "next-seo";
import Content from "../components/Content/Content";
import TestQR from "../components/TestQR/TestQR";
import {testcases} from "../constants/testcases";


export default function App() {

    return (
        <>
            <NextSeo
                title="App Testing"
                description="my app"
            />
            <Content>
                {
                    Object.keys(testcases).map(testcase => {
                        return (
                        <TestQR key={testcase} name={testcase}
                                testcase={testcases[testcase]}/>
                    )})
                }
            </Content>
        </>
    );
}
