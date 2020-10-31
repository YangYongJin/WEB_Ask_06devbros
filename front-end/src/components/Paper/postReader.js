import React, { useEffect } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import {  useLocation } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';

import { Link } from 'react-router-dom';
import renderTextArea from '../Render/renderTextArea';
import CommentTable from '../Table/CommentTable';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(10),
      marginTop: theme.spacing(10),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    button: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(1.5),
        marginRight: theme.spacing(1.5),
        width: '25em',
        [theme.breakpoints.down('md')]: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            width: 'auto',
        },
    },
  }));


function PostReader(props) {
    const { addPost } = props;
    const [post, setPost] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [comment, setValue] = React.useState(null);

    let location = useLocation();
    const id = location.pathname.slice(7, location.pathname.length);

    const handleChange = (e) => {
      setValue(e.target.value);
    };
    console.log(comment);
    const handleSubmit = async () => {
      await axios.post(`/posts/${id}/comments`, { comment });
    }

    useEffect(() => {
      const getPostById = async () => {
        const { 
          data: { 
            post
          }
        } = await axios.get(`/posts/${id}`);

        setPost(post);
        setIsLoading(false);
      }

      getPostById();
    }, []);

    const classes = useStyles();

    return (
      <React.Fragment>
        { isLoading ?
        (
          <Container maxWidth="lg" className={classes.content}>
            isLoading...
          </Container>
        ) :
        (
        <Paper className={classes.paper}>
              <form>
                <TextField
                 name="title" 
                 value={post.title} 
                 variant="outlined" 
                 margin="normal" 
                 required 
                 multiline 
                 fullWidth 
                 InputProps={{
                    readOnly: true
                  }}
                />
                <TextField
                 name="content"
                 rows={10}
                 value={post.content}
                 variant="outlined"
                 margin="normal" 
                 required 
                 multiline 
                 fullWidth 
                 InputProps={{
                    readOnly: true 
                  }}
                />
                <Grid item xs={12}>
                  <CommentTable id={id} />
                </Grid>
                <Field name="content" value={comment} rows={5} component={renderTextArea} label="댓글을 입력해주세요." onChange={handleChange} />
                <Grid item xs={12}>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon></Icon>}
                >
                    댓글 달기
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    endIcon={<Icon></Icon>}
                >
                  <Link to={`/posts/${id}/edit`} style={{textDecoration:"none", color:"black"}}>
                    수정하기
                  </Link>
                </Button>
                </Grid>
            </form>
        </Paper>
        )
                }
      </React.Fragment>
    )
}

export default reduxForm({
  form:'PostReader'
})(PostReader);