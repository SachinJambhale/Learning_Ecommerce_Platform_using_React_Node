import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import * as React from "react";
import Customer from "../../../shared/models/CustomerModel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomerContext from "./CustomerContext";
import { API, endpoints } from "../../../api";
import CustomerService from "../../../services/CustomerService";

interface ICustomerDetailsProps {}

const CustomerDetails: React.FunctionComponent<ICustomerDetailsProps> = () => {
  const [custProfilePic, setCustProfilePic] = React.useState<
    string | ArrayBuffer
  >("");
  const { operation } = React.useContext(CustomerContext);
  const [customer, setCustomer] = React.useState<Customer>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, name: { ...customer.name, [name]: value } });
  };
  const handleSubmit = () => {
    const fd = new FormData();

    for (const prop in customer as Iterable<string>) {
      const value = customer[prop];
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

    CustomerService.createCustomer(fd)
      .then((response) => {
        console.log("Response :", response);
      })
      .catch(console.log);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files && e?.target?.files[0];
    console.log("File: ", file);
    setCustomer({ ...customer, avatar: file as File });
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      console.log("reader.result: ", reader.result);
    }
    // readAsDataURL() this method converts base64 string format
    reader.addEventListener(
      "load",
      () => {
        setCustProfilePic(reader.result as string);
      },
      false
    );
  };

  const handleDeleteAvatar = () => {
    setCustProfilePic("");
    setCustomer({ ...customer, avatar: "" });
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Paper sx={{ padding: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
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
                    {custProfilePic && (
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
                      htmlFor="avatar"
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
                        operation == "edit" &&
                        typeof customer.avatar == "string"
                          ? `${endpoints.serverBaseURL}/${customer.avatar}`
                          : custProfilePic
                          ? (custProfilePic as string)
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxoSn7GBNeUetrkNssg5dGJRn4Q18bo7YQLDVfFHou&s"
                      }
                    />
                    <input
                      type="file"
                      id="avatar"
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
                      value={customer.name?.first}
                      onChange={handleNameChange}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Last Name"
                      name="last"
                      value={customer.name?.last}
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
                  value={customer.mobile}
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
                  value={customer.email}
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
                  value={customer.password}
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
                    typeof customer.dob == "string"
                      ? customer.dob.split("T")[0]
                      : customer.dob
                  }
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl>
                  <FormLabel id="gender">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="gender"
                    value={customer.gender}
                    name="gender"
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
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
                  <InputLabel id="status">Status</InputLabel>
                  <Select
                    labelId="status"
                    value={customer.status}
                    label="Status"
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        status: e.target.value as number,
                      })
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
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default CustomerDetails;
