import * as React from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import User from "../../../shared/models/UserModel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MenuItem } from "@mui/material";
import UserService from "../../../services/UserService";
import UserContext from "./UserContext";
import { endpoints } from "../../../api";

interface IUserFormProps {}

const UserForm: React.FunctionComponent<IUserFormProps> = (props) => {
  const [profilePic, setProfilePic] = React.useState<string | ArrayBuffer>("");
  const { operation, loadUsers, handleClose, initialUser } =
    React.useContext(UserContext);
  const [user, setUser] = React.useState<User>({
    role: "admin",
    gender: "female",
    status: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, name: { ...user.name, [name]: value } });
  };

  React.useEffect(() => {
    if (initialUser) setUser({ ...user, ...initialUser });
  }, [initialUser]);

  const handleSubmit = () => {
    console.log("User:", user);

    if (operation == "edit") {
      const fd = new FormData();

      const compareProps = (oldUser: User, newUser: User, outer?: string) => {
        const currentObjKeys = Object.keys(newUser);

        for (const prop of currentObjKeys) {
          const newVal = newUser[prop];

          if (newVal && oldUser[prop] != newVal) {
            if (!Array.isArray(newVal) && typeof newVal == "object") {
              compareProps(oldUser[prop], newVal, prop);
            } else if (prop == "avatar") {
              if (typeof newVal != "string") fd.append(prop, newVal);
            } else {
              fd.append(`${outer ? outer + "." : ""}${prop}`, newVal);
            }
          }
        }
      };
      compareProps(initialUser, user);

      UserService.updateUser(user._id as string, fd).then((response) => {
        console.log("Response : ", response);
        loadUsers();
        handleClose();
      });
    } else {
      const fd = new FormData();

      for (const prop in user as Iterable<string>) {
        const value = user[prop];
        if (prop == "name") {
          fd.append("name.first", value?.first);
          fd.append("name.last", value?.last);
        } else if (prop == "avatar") {
          if (value && typeof value != "string") {
            fd.append(prop, value);
          }
        } else if (value) {
          fd.append(prop, value);
        }
      } //for

      UserService.createUser(fd)
        .then((response) => {
          console.log("Response :", response);
          loadUsers();
          handleClose();
        })
        .catch(console.log);
    }
  }; //handleSubmit

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("User: ", user);
    const file = e?.target?.files && e?.target?.files[0];

    setUser({ ...user, avatar: file as File });
    const reader = new FileReader();
    console.log("file: ", file);

    if (file) {
      reader.readAsDataURL(file);
      console.log("reader.result: ", reader.result); 
    }
    // readAsDataURL() this method converts base64 string format
    reader.addEventListener(
      "load",
      () => {
        setProfilePic(reader.result as string);
      },
      false
    );
  };

  const handleDeleteAvatar = () => {
    setProfilePic("");
    setUser({ ...user, avatar: "" });
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item container xs={12}>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                border: "1px solid #999",
                margin: "auto",
                position: "relative",
                width: 150,
                height: 150,
              }}
            >
              {profilePic && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    cursor: "pointer",
                    textAlign: "center",
                    background: "#eee8",
                    padding: 2,
                    borderRadius: 5,
                  }}
                >
                  <DeleteIcon onClick={handleDeleteAvatar} />
                </span>
              )}
              <label
                htmlFor="custavatar"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  cursor: "pointer",
                  textAlign: "center",
                  background: "#eee8",
                  padding: 2,
                  borderRadius: 5,
                }}
              >
                <EditIcon />
              </label>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                src={
                  operation == "edit" && typeof user.avatar == "string"
                    ? `${endpoints.serverBaseURL}/${user.avatar}`
                    : profilePic
                    ? (profilePic as string)
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxoSn7GBNeUetrkNssg5dGJRn4Q18bo7YQLDVfFHou&s"
                }
              />
              <input
                type="file"
                id="custavatar"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            </Box>
          </Grid>
          <Grid item container xs={12} md={6} spacing={2}>
            <Grid item md={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="First Name"
                name="first"
                value={user.name?.first}
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Last Name"
                name="last"
                value={user.name?.last}
                onChange={handleNameChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Mobile"
            name="mobile"
            value={user.mobile}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Salary"
            type="salary"
            name="salary"
            value={user.salary}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="DOB"
            type="date"
            name="dob"
            value={
              typeof user.dob == "string" ? user.dob.split("T")[0] : user.dob
            }
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="gender">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="gender"
              value={user.gender}
              name="gender"
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="role">Role</InputLabel>
            <Select
              labelId="role"
              value={user.role}
              label="Role"
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              value={user.status}
              label="Status"
              onChange={(e) =>
                setUser({ ...user, status: e.target.value as number })
              }
            >
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="0">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UserForm;
