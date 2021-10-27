// const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

// function jsonDateReviver(key, value) {
//   if (dateRegex.test(value)) return new Date(value);
//   return value;
// }

class DisplayFreeSlots extends React.Component {
  render() {
    const free = 25 - this.props.cusNum;
    return (
      <div className = "freeslot">Free Slots: {free}</div>
    );
  }
}

function CustomerRow(props) {
  const customer = props.customer;
  return (
    <tr>
      <td>{customer.id}</td>
      <td>{customer.name}</td>
      <td>{customer.phone}</td>
      <td>{customer.created}</td>
    </tr>
  );
}

function CustomerTable(props) {
  const customerRows = props.customers.map(customer =>
    <CustomerRow key={customer.id} customer={customer} />
  );

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Time Stamp</th>
        </tr>
      </thead>
      <tbody>
        {customerRows}
      </tbody>
    </table>
  );
}

class CustomerAdd extends React.Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFind = this.handleFind.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    const form = document.forms.customerEdit;
    const customer = {
      name: form.name.value, phone: form.phone.value,
    }
    console.log(customer)
    this.props.createCustomer(customer);
    form.name.value = ""; form.phone.value = "";
  }

  handleDelete(e) {
    e.preventDefault();
    const form = document.forms.customerEdit;
    const customer = {
      name: form.name.value, phone: form.phone.value,
    }
    this.props.deleteCustomer(customer);
    form.name.value = ""; form.phone.value = "";
  }

  handleFind(e) {
    e.preventDefault();
    const form = document.forms.customerEdit;
    const customer = {
      name: form.name.value, phone: form.phone.value,
    }
    this.props.findCustomer(customer);
    form.name.value = ""; form.phone.value = "";
  }

  handleBack(e) {
    e.preventDefault();
    this.props.back();
  }

  render() {
    return (
      <div>
        <form className = "infoForm" name = "customerEdit">
          <input type="text" name="name" placeholder="name" />
          <input type="text" name="phone" placeholder="phone" />
          <br/>
          <br/>
          <button className = "button" onClick={this.handleAdd}>Add</button>
          <button className = "button" onClick={this.handleDelete}>Delete</button>
          <button className = "button" onClick={this.handleFind}>Find</button>
          <button className = "button" onClick={this.handleBack}>Back</button>
        </form>
      </div>
    );
  }
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
      alert(`Error in sending data to server: ${e.message}. The field phone must be a number.`);
  }
}

class CustomerList extends React.Component {
  constructor() {
    super();

    this.state = { 
      customers: [], 
      customerNumber: 0
    };

    this.createCustomer = this.createCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
    this.findCustomer = this.findCustomer.bind(this);
    this.back = this.back.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      customerList {
        id name phone created
      }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ customers: data.customerList, customerNumber: data.customerList.length });
    }
  }

  async createCustomer(customer) {
    const query = `mutation customerAdd($customer: CustomerInputs!) {
      customerAdd(customer: $customer) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { customer });
    console.log(data);
    if (data) {
      this.loadData();
    }
  }


  async deleteCustomer(customer) {
    const query = `mutation customerDelete($customer: CustomerInputs!) {
      customerDelete(customer: $customer)
    }`;

    const data = await graphQLFetch(query, { customer });
    console.log(data)
    this.loadData();
  }

  async findCustomer(customer) {
    const query = `query customerFind($customer: CustomerInputs!) {
      customerFind(customer: $customer){
        id
        name
        phone
        created
      }
      
    }`;

    const data = await graphQLFetch(query, { customer });
    console.log(data)
    if (data) {
      this.setState({ customers: data.customerFind });
    }
  }

  back() {
    this.loadData()
  }


  render() {
    return (
      <React.Fragment>
        <div className = 'head'>Hotel California International</div>
        <DisplayFreeSlots className = 'free' cusNum = {this.state.customerNumber}/>
        <hr />
        <CustomerTable customers={this.state.customers} />
        <hr />
        <CustomerAdd createCustomer={this.createCustomer} deleteCustomer={this.deleteCustomer} findCustomer={this.findCustomer} back = {this.back}/>
      </React.Fragment>
    );
  }
}

const element = <CustomerList />;

ReactDOM.render(element, document.getElementById('contents'));
