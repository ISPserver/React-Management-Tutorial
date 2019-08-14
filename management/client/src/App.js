import React, { Component } from 'react';
import Customer from './components/Customer'
import CustomerAdd from './components/CustomerAdd'
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  }, 
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  }
})


class App extends Component {
  
    state = { //일반적으로 props는 변할 수 없는 값들을 정의
              //state는 변할 수 있는 값들을 정의
      customers:"",
      completed: 0
    }

    componentDidMount() {    //componentDidMount를 사용해서
      this.timer = setInterval(this.progress, 20);
      this.callApi()        //Api서버를 요청
        .then(res => this.setState({customers: res})) // 데이터받아와서 설정
        .catch(err => console.log(err));
    }
    
    callApi = async () => {
    const response = await fetch('/api/customers'); // 데이터를 받아옴
    const body = await response.json(); // json방식으로 body에 데이터를 담음
    return body;
  };
  get callApi() {
    return this._callApi;
  }
  set callApi(value) {
    this._callApi = value;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed +1}) 
  }

  render() {
    const { classes } = this.props;
    return (
        <div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {this.state.customers ? this.state.customers.map(c => {
              return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>)
              }) : 
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                  </TableCell>
                </TableRow>
                }
            </TableBody>  
            </Table>
          </Paper>
          <CustomerAdd/>
        </div>
    ); 
  }
}

export default withStyles(styles)(App);
