import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get list of companies (filtered by name if not undefined). */

  static async getCompanies(name) {
    try {
      if (name) {
        let res = await this.request(`companies`);
        return res.companies.filter(c => {
          return c.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
        })
      }
  
      let res = await this.request(`companies`);
      return res.companies;
    } 
    catch (error) {
      console.error("Error getting companies:", error);
      throw error;
    }
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    try {
      let res = await this.request(`companies/${handle}`);
      return res.company;
    }
    catch (error) {
      console.error("Error getting company:", error);
      throw error;
    }
  }

  /** Get jobs (filtered by title if not undefined). */

  static async getJobs(title) {
    try {
      if (title) {
        let res = await this.request(`jobs`);
        return res.jobs.filter(c => {
          return c.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())
        })
      }
  
      let res = await this.request(`jobs`);
      return res.jobs;
    }
    catch (error) {
      console.error("Error getting jobs:", error);
      throw error;
    }
  }

  /** Get token for login from username, password. Authenticate user */
  
  static async login(loginData) {
    // loginData object must include { username, password }
    try {
      let res = await this.request("auth/token", loginData, "post");
      return res.token;
    }
    catch (error) {
      console.error("Error authenticating user:", error);
      throw error;
    }
  }

  /** Signup for site / Register new user. */

  static async signup(signupData) {
    // signupData object must include { username, password, firstName, lastName, email }
    try {
      let res = await this.request("auth/register", signupData, "post");
      return res.token;
    }
    catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  /** Get the current user. */

  static async getCurrentUser(username) {
    if (!this.token) {
      console.error("No token available. Cannot fetch user.");
      return null;
    }

    if (!username) {
      console.error("Please add username.");
      return null;
    }

    try {
      const res = await this.request(`users/${username}`);
      return res.user
    }
    catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }

  /** Save user profile page upon editing. */

  static async saveProfile(username, profileData) {
    // profileData object must include { firstName, lastName, email, password }
    try {
      let res = await this.request(`users/${username}`, profileData, "patch");

      // Save updated token, will cause rerender from App.js useEffect
      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      return res.user;
    }
    catch (error) {
      console.error("Error editing profile:", error);
      throw error;
    }
  }

  /** Apply to a job */

  static async applyToJob(username, id) {
    try {
      await this.request(`users/${username}/jobs/${id}`, {}, "post");
    }
    catch (error) {
      console.error("Error applying to job:", error);
      throw error;
    }
   }
}



// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default JoblyApi;