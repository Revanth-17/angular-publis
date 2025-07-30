import { Component, OnInit } from '@angular/core';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  role: string;
  email: string;
  phone: string;
  location: string;
  ssn: string;
  avatar: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchQuery: string = '';
  users: User[] = [];
  filteredUsers: User[] = [];
  isLoading = false;
  error: string | null = null;
  sortBy: string = 'firstName-asc';
  roleFilter: string = 'All';
  tempUsers : any = [] ;
  distinctRoles : any = [];
  viewUsers : any = [];
  viewError : string | null = null;

  readonly MIN_SEARCH_LENGTH = 3;

  ngOnInit(): void {
    this.loadUsers(); 
  }

  async loadUsers(): Promise<void> {
    let module = this.userData(); 
    this.tempUsers = this.userData();
    this.users = this.tempUsers;
    this.distinctRoles = [...new Set(this.users.map(user => user.role))];
  }

  onSearch(): void {
    this.roleFilter = 'All'
    if (this.searchQuery.length < this.MIN_SEARCH_LENGTH) {
      this.error = `Please enter at least ${this.MIN_SEARCH_LENGTH} characters to search`;
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      const q = this.searchQuery.toLowerCase();
      this.filteredUsers = this.users.filter(user =>
        user.firstName.toLowerCase().includes(q) ||
        user.lastName.toLowerCase().includes(q) ||
        user.ssn.includes(q)
      );
      this.applyFilters();
      this.isLoading = false;
      this.error = this.filteredUsers.length === 0 ? 'No users found' : null;
    }, 300); // simulate debounce
  }

  applyFilters(): void {
    let results = [...this.filteredUsers];

    if (this.roleFilter !== 'All') {
      results = results.filter(user => user.role === this.roleFilter);
    }

    const [field, dir] = this.sortBy.split('-');
    results.sort((a: any, b: any) => {
      const valA = typeof a[field] === 'string' ? a[field].toLowerCase() : a[field];
      const valB = typeof b[field] === 'string' ? b[field].toLowerCase() : b[field];
      return dir === 'asc' ? valA > valB ? 1 : -1 : valA < valB ? 1 : -1;
    });

    this.viewUsers = results;
    if(!this.viewUsers.length){
      this.roleFilter = 'All';
      this.viewError = this.viewUsers.length === 0 ? 'No Users For this filter' : null;
    }
  }

  userData() : any {
    return  [
        {
          "id": 1,
          "firstName": "John",
          "lastName": "Doe",
          "age": 32,
          "role": "Admin",
          "email": "john.doe@company.com",
          "phone": "+1-555-0123",
          "location": "New York, NY",
          "ssn": "123-45-6789",
          "avatar": "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
        },
        {
          "id": 2,
          "firstName": "Jane",
          "lastName": "Smith",
          "age": 28,
          "role": "User",
          "email": "jane.smith@company.com",
          "phone": "+1-555-0124",
          "location": "Los Angeles, CA",
          "ssn": "234-56-7890",
          "avatar": "https://ui-avatars.com/api/?name=Jane+Smith&background=2196F3&color=fff"
        },
        {
          "id": 3,
          "firstName": "Michael",
          "lastName": "Johnson",
          "age": 45,
          "role": "Manager",
          "email": "michael.johnson@company.com",
          "phone": "+1-555-0125",
          "location": "Chicago, IL",
          "ssn": "345-67-8901",
          "avatar": "https://ui-avatars.com/api/?name=Michael+Johnson&background=4CAF50&color=fff"
        },
        {
          "id": 4,
          "firstName": "Sarah",
          "lastName": "Williams",
          "age": 35,
          "role": "Admin",
          "email": "sarah.williams@company.com",
          "phone": "+1-555-0126",
          "location": "Houston, TX",
          "ssn": "456-78-9012",
          "avatar": "https://ui-avatars.com/api/?name=Sarah+Williams&background=FF9800&color=fff"
        },
        {
          "id": 5,
          "firstName": "David",
          "lastName": "Brown",
          "age": 29,
          "role": "User",
          "email": "david.brown@company.com",
          "phone": "+1-555-0127",
          "location": "Phoenix, AZ",
          "ssn": "567-89-0123",
          "avatar": "https://ui-avatars.com/api/?name=David+Brown&background=E91E63&color=fff"
        },
        {
          "id": 6,
          "firstName": "Emily",
          "lastName": "Davis",
          "age": 31,
          "role": "Manager",
          "email": "emily.davis@company.com",
          "phone": "+1-555-0128",
          "location": "Philadelphia, PA",
          "ssn": "678-90-1234",
          "avatar": "https://ui-avatars.com/api/?name=Emily+Davis&background=9C27B0&color=fff"
        },
        {
          "id": 7,
          "firstName": "Chris",
          "lastName": "Miller",
          "age": 42,
          "role": "Admin",
          "email": "chris.miller@company.com",
          "phone": "+1-555-0129",
          "location": "San Antonio, TX",
          "ssn": "789-01-2345",
          "avatar": "https://ui-avatars.com/api/?name=Chris+Miller&background=607D8B&color=fff"
        },
        {
          "id": 8,
          "firstName": "Amanda",
          "lastName": "Wilson",
          "age": 26,
          "role": "User",
          "email": "amanda.wilson@company.com",
          "phone": "+1-555-0130",
          "location": "San Diego, CA",
          "ssn": "890-12-3456",
          "avatar": "https://ui-avatars.com/api/?name=Amanda+Wilson&background=795548&color=fff"
        },
        {
          "id": 9,
          "firstName": "Robert",
          "lastName": "Moore",
          "age": 38,
          "role": "Manager",
          "email": "robert.moore@company.com",
          "phone": "+1-555-0131",
          "location": "Dallas, TX",
          "ssn": "901-23-4567",
          "avatar": "https://ui-avatars.com/api/?name=Robert+Moore&background=FF5722&color=fff"
        },
        {
          "id": 10,
          "firstName": "Jessica",
          "lastName": "Taylor",
          "age": 33,
          "role": "User",
          "email": "jessica.taylor@company.com",
          "phone": "+1-555-0132",
          "location": "San Jose, CA",
          "ssn": "012-34-5678",
          "avatar": "https://ui-avatars.com/api/?name=Jessica+Taylor&background=3F51B5&color=fff"
        },
        {
          "id": 11,
          "firstName": "Daniel",
          "lastName": "Anderson",
          "age": 27,
          "role": "Guest",
          "email": "daniel.anderson@company.com",
          "phone": "+1-555-0133",
          "location": "Austin, TX",
          "ssn": "123-98-7654",
          "avatar": "https://ui-avatars.com/api/?name=Daniel+Anderson&background=009688&color=fff"
        },
        {
          "id": 12,
          "firstName": "Lisa",
          "lastName": "Thomas",
          "age": 40,
          "role": "Admin",
          "email": "lisa.thomas@company.com",
          "phone": "+1-555-0134",
          "location": "Jacksonville, FL",
          "ssn": "234-87-6543",
          "avatar": "https://ui-avatars.com/api/?name=Lisa+Thomas&background=CDDC39&color=333"
        },
        {
          "id": 13,
          "firstName": "Kevin",
          "lastName": "Jackson",
          "age": 36,
          "role": "Manager",
          "email": "kevin.jackson@company.com",
          "phone": "+1-555-0135",
          "location": "San Francisco, CA",
          "ssn": "345-76-5432",
          "avatar": "https://ui-avatars.com/api/?name=Kevin+Jackson&background=FFC107&color=333"
        },
        {
          "id": 14,
          "firstName": "Michelle",
          "lastName": "White",
          "age": 30,
          "role": "User",
          "email": "michelle.white@company.com",
          "phone": "+1-555-0136",
          "location": "Columbus, OH",
          "ssn": "456-65-4321",
          "avatar": "https://ui-avatars.com/api/?name=Michelle+White&background=8BC34A&color=fff"
        },
        {
          "id": 15,
          "firstName": "Ryan",
          "lastName": "Harris",
          "age": 44,
          "role": "Admin",
          "email": "ryan.harris@company.com",
          "phone": "+1-555-0137",
          "location": "Fort Worth, TX",
          "ssn": "567-54-3210",
          "avatar": "https://ui-avatars.com/api/?name=Ryan+Harris&background=00BCD4&color=fff"
        },
        {
          "id": 16,
          "firstName": "Nicole",
          "lastName": "Martin",
          "age": 25,
          "role": "Guest",
          "email": "nicole.martin@company.com",
          "phone": "+1-555-0138",
          "location": "Charlotte, NC",
          "ssn": "678-43-2109",
          "avatar": "https://ui-avatars.com/api/?name=Nicole+Martin&background=E91E63&color=fff"
        },
        {
          "id": 17,
          "firstName": "Steven",
          "lastName": "Garcia",
          "age": 39,
          "role": "Manager",
          "email": "steven.garcia@company.com",
          "phone": "+1-555-0139",
          "location": "Seattle, WA",
          "ssn": "789-32-1098",
          "avatar": "https://ui-avatars.com/api/?name=Steven+Garcia&background=673AB7&color=fff"
        },
        {
          "id": 18,
          "firstName": "Stephanie",
          "lastName": "Rodriguez",
          "age": 34,
          "role": "User",
          "email": "stephanie.rodriguez@company.com",
          "phone": "+1-555-0140",
          "location": "Denver, CO",
          "ssn": "890-21-0987",
          "avatar": "https://ui-avatars.com/api/?name=Stephanie+Rodriguez&background=FF5722&color=fff"
        },
        {
          "id": 19,
          "firstName": "Brian",
          "lastName": "Lewis",
          "age": 41,
          "role": "Admin",
          "email": "brian.lewis@company.com",
          "phone": "+1-555-0141",
          "location": "Washington, DC",
          "ssn": "901-10-9876",
          "avatar": "https://ui-avatars.com/api/?name=Brian+Lewis&background=795548&color=fff"
        },
        {
          "id": 20,
          "firstName": "Kimberly",
          "lastName": "Lee",
          "age": 28,
          "role": "User",
          "email": "kimberly.lee@company.com",
          "phone": "+1-555-0142",
          "location": "Boston, MA",
          "ssn": "012-09-8765",
          "avatar": "https://ui-avatars.com/api/?name=Kimberly+Lee&background=607D8B&color=fff"
        },
        {
          "id": 21,
          "firstName": "Jason",
          "lastName": "Walker",
          "age": 37,
          "role": "Manager",
          "email": "jason.walker@company.com",
          "phone": "+1-555-0143",
          "location": "El Paso, TX",
          "ssn": "123-87-6543",
          "avatar": "https://ui-avatars.com/api/?name=Jason+Walker&background=9C27B0&color=fff"
        },
        {
          "id": 22,
          "firstName": "Lauren",
          "lastName": "Hall",
          "age": 32,
          "role": "Guest",
          "email": "lauren.hall@company.com",
          "phone": "+1-555-0144",
          "location": "Nashville, TN",
          "ssn": "234-76-5432",
          "avatar": "https://ui-avatars.com/api/?name=Lauren+Hall&background=FF9800&color=fff"
        },
        {
          "id": 23,
          "firstName": "Mark",
          "lastName": "Allen",
          "age": 43,
          "role": "Admin",
          "email": "mark.allen@company.com",
          "phone": "+1-555-0145",
          "location": "Detroit, MI",
          "ssn": "345-65-4321",
          "avatar": "https://ui-avatars.com/api/?name=Mark+Allen&background=4CAF50&color=fff"
        },
        {
          "id": 24,
          "firstName": "Rachel",
          "lastName": "Young",
          "age": 29,
          "role": "User",
          "email": "rachel.young@company.com",
          "phone": "+1-555-0146",
          "location": "Memphis, TN",
          "ssn": "456-54-3210",
          "avatar": "https://ui-avatars.com/api/?name=Rachel+Young&background=2196F3&color=fff"
        },
        {
          "id": 25,
          "firstName": "Jonathan",
          "lastName": "Hernandez",
          "age": 35,
          "role": "Manager",
          "email": "jonathan.hernandez@company.com",
          "phone": "+1-555-0147",
          "location": "Portland, OR",
          "ssn": "567-43-2109",
          "avatar": "https://ui-avatars.com/api/?name=Jonathan+Hernandez&background=0D8ABC&color=fff"
        } ];



  }
}
