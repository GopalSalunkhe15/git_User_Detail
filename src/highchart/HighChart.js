import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
const Highchart = ({categories,fork,issue,...props})=>{
    return(
        <HighchartsReact Highcharts={Highcharts}
              options = {
                {
                  title: {
                    text: 'Git user details'
                },
                  xAxis: {
                    categories: categories
                },
                  series:[
                    {
                      name:'forks',
                      data:fork
                    },
                    {
                      name:'issues',
                      data:issue
                    }
                  ]
                }
              } />
    )

}
export default Highchart;