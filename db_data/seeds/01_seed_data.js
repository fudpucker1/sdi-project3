exports.seed = async function(knex, Promise) {
    await knex('ticket_updates').del()
    await knex('tickets').del()
    await knex('equipment').del()
    await knex('ticket_type').del()
    await knex('priority_levels').del()
    await knex('help_desk_users').del()
    await knex('user_type').del()
    await knex.raw('TRUNCATE TABLE user_type RESTART IDENTITY CASCADE')
    await knex.raw('TRUNCATE TABLE help_desk_users RESTART IDENTITY CASCADE')
    await knex.raw('TRUNCATE TABLE priority_levels RESTART IDENTITY CASCADE')
    await knex.raw('TRUNCATE TABLE ticket_type RESTART IDENTITY CASCADE')
    await knex.raw('TRUNCATE TABLE equipment RESTART IDENTITY CASCADE')
    await knex.raw('TRUNCATE TABLE tickets RESTART IDENTITY CASCADE')
    await knex.raw('TRUNCATE TABLE ticket_updates RESTART IDENTITY CASCADE')

    // Inserts user_type seed entries
    .then ( () => {
        return knex('user_type').insert([
            {name: 'Admin', description: 'Have overall control and management of the ticket tracking system.'},
            {name: 'Agents', description: 'Responsible for handling and resolving the tickets.'},
            {name: 'Supervisor', description: 'Oversee the work of agents.'},
            {name: 'Project Managers', description: 'Use the ticket tracking system to monitor the progress of tasks, track project-related issues, and ensure that project timelines and milestones are met.'},
            {name: 'Auditors', description: 'Use the ticket tracking system to ensure that proper procedures are followed, records are maintained, and regulatory requirements are met.'}
        ])
    })

    // Inserts help_desk_users seed entries
    .then(() => {
        return knex('help_desk_users').insert([
            // Admins
            { username: 'john.smith', password: 'password', user_type_id: 1 },
            { username: 'emily.jones', password: 'password', user_type_id: 1 },
            { username: 'david.wilson', password: 'password', user_type_id: 1 },
            { username: 'sarah.davis', password: 'password', user_type_id: 1 },
            { username: 'michael.brown', password: 'password', user_type_id: 1 },

            // Agents
            { username: 'lisa.miller', password: 'password', user_type_id: 2 },
            { username: 'kevin.jackson', password: 'password', user_type_id: 2 },
            { username: 'jessica.thomas', password: 'password', user_type_id: 2 },
            { username: 'matthew.harris', password: 'password', user_type_id: 2 },
            { username: 'laura.anderson', password: 'password', user_type_id: 2 },
            { username: 'jason.white', password: 'password', user_type_id: 2 },
            { username: 'amanda.roberts', password: 'password', user_type_id: 2 },
            { username: 'daniel.taylor', password: 'password', user_type_id: 2 },
            { username: 'ashley.moore', password: 'password', user_type_id: 2 },
            { username: 'robert.clark', password: 'password', user_type_id: 2 },
            { username: 'jennifer.lewis', password: 'password', user_type_id: 2 },
            { username: 'christopher.hall', password: 'password', user_type_id: 2 },
            { username: 'melissa.carter', password: 'password', user_type_id: 2 },
            { username: 'brian.edwards', password: 'password', user_type_id: 2 },
            { username: 'stephanie.murphy', password: 'password', user_type_id: 2 },
            { username: 'ryan.rodriguez', password: 'password', user_type_id: 2 },
            { username: 'nicole.cooper', password: 'password', user_type_id: 2 },
            { username: 'william.lee', password: 'password', user_type_id: 2 },
            { username: 'karen.perez', password: 'password', user_type_id: 2 },
            { username: 'eric.gonzalez', password: 'password', user_type_id: 2 },

            // Supervisors
            { username: 'susan.thompson', password: 'password', user_type_id: 3 },
            { username: 'patrick.murphy', password: 'password', user_type_id: 3 },
            { username: 'jessica.hall', password: 'password', user_type_id: 3 },

            // Project Managers
            { username: 'andrew.nguyen', password: 'password', user_type_id: 4 },
            { username: 'kelly.robinson', password: 'password', user_type_id: 4 },

            // Auditor
            { username: 'aaron.collins', password: 'password', user_type_id: 5 }
        ])
  })

 // Inserts priority_levels seed entries
  .then(() => {
    return knex('priority_levels').insert([
      { severity: 'Low', description: 'Low priority - Non-critical issues, no significant impact on operations.' },
      { severity: 'Medium', description: 'Medium priority - Some impact on operations, but not critical.' },
      { severity: 'High', description: 'High priority - Significant impact on operations, requires prompt attention.' },
      { severity: 'Urgent', description: 'Urgent priority - Critical issues affecting operations, requires immediate attention.' },
      { severity: 'Emergency', description: 'Emergency priority - System-wide critical issues affecting business continuity, requires immediate action.' }
    ])
  })

 // Inserts ticket_type seed entries
  .then(() => {
    return knex('ticket_type').insert([
      { request_type: 'Technical Issue'},
      { request_type: 'User Support'},
      { request_type: 'Software Enhancement'},
      { request_type: 'Hardware Maintenance'},
      { request_type: 'Network Connectivity'}
    ])
  })

 // Inserts equipment seed entries
  .then(() => {
    return knex('equipment').insert([
      { type: 'Laptop', model: 'Dell Latitude 7400', serial_number: 'DL7400-001', purchase_date: '2023-01-15', end_of_life_date: '2028-01-15', notes: '8GB RAM, 256GB SSD' },
      { type: 'Laptop', model: 'HP EliteBook 840 G7', serial_number: 'HP840G7-002', purchase_date: '2022-12-20', end_of_life_date: '2027-12-20', notes: '16GB RAM, 512GB SSD' },
      { type: 'Server', model: 'Dell PowerEdge R740', serial_number: 'DER740-001', purchase_date: '2023-03-10', end_of_life_date: '2030-03-10', notes: 'Dual Xeon Gold 6254, 64GB RAM, 2TB HDD' },
      { type: 'Server', model: 'HP ProLiant DL380 Gen10', serial_number: 'HPDL380G10-002', purchase_date: '2022-11-05', end_of_life_date: '2029-11-05', notes: 'Quad-core Xeon, 32GB RAM, 1TB SSD' },
      { type: 'PC', model: 'Dell OptiPlex 7070', serial_number: 'DO7070-001', purchase_date: '2023-02-28', end_of_life_date: '2028-02-28', notes: 'Intel Core i7, 16GB RAM, 1TB HDD' },
      { type: 'PC', model: 'HP ProDesk 600 G5', serial_number: 'HP600G5-002', purchase_date: '2022-10-10', end_of_life_date: '2027-10-10', notes: 'Intel Core i5, 8GB RAM, 512GB SSD' },
      { type: 'Laptop', model: 'Lenovo ThinkPad X1 Carbon', serial_number: 'LTX1C-001', purchase_date: '2023-04-05', end_of_life_date: '2028-04-05', notes: '12GB RAM, 512GB SSD' },
      { type: 'Laptop', model: 'Apple MacBook Pro', serial_number: 'MBP-001', purchase_date: '2022-09-20', end_of_life_date: '2027-09-20', notes: 'Apple M1 chip, 16GB RAM, 512GB SSD' },
      { type: 'Server', model: 'IBM Power System AC922', serial_number: 'IBMPS-001', purchase_date: '2023-03-15', end_of_life_date: '2030-03-15', notes: 'Power9 CPU, 128GB RAM, 4TB HDD' },
      { type: 'Server', model: 'Cisco UCS C240 M5', serial_number: 'CUCS240M5-002', purchase_date: '2022-11-10', end_of_life_date: '2029-11-10', notes: 'Dual Xeon, 64GB RAM, 2TB SSD' },
      { type: 'PC', model: 'Microsoft Surface Studio 2', serial_number: 'MSS2-001', purchase_date: '2023-02-15', end_of_life_date: '2028-02-15', notes: 'Intel Core i7, 32GB RAM, 1TB SSD' },
      { type: 'PC', model: 'Asus ROG Strix GL12', serial_number: 'ASUSGL12-002', purchase_date: '2022-10-20', end_of_life_date: '2027-10-20', notes: 'AMD Ryzen 9, 32GB RAM, 1TB SSD' },
      { type: 'Laptop', model: 'Microsoft Surface Laptop 4', serial_number: 'MSL4-001', purchase_date: '2023-04-10', end_of_life_date: '2028-04-10', notes: 'AMD Ryzen 7, 16GB RAM, 512GB SSD' },
      { type: 'Laptop', model: 'Acer Predator Helios 300', serial_number: 'APH300-002', purchase_date: '2022-09-25', end_of_life_date: '2027-09-25', notes: 'Intel Core i7, 16GB RAM, 1TB SSD' },
      { type: 'Server', model: 'Supermicro SuperServer 1029P-N32R', serial_number: 'SS1029P-N32R-001', purchase_date: '2023-03-20', end_of_life_date: '2030-03-20', notes: 'Dual Xeon Scalable, 128GB RAM, 4TB HDD' },
      { type: 'Server', model: 'HPE ProLiant ML110 Gen10', serial_number: 'HPEML110G10-002', purchase_date: '2022-11-15', end_of_life_date: '2029-11-15', notes: 'Xeon Bronze, 32GB RAM, 1TB HDD' },
      { type: 'PC', model: 'Alienware Aurora R10', serial_number: 'AWAR10-001', purchase_date: '2023-02-25', end_of_life_date: '2028-02-25', notes: 'AMD Ryzen 9, 32GB RAM, 2TB SSD' },
      { type: 'PC', model: 'HP ENVY Desktop', serial_number: 'HPENVY-002', purchase_date: '2022-10-30', end_of_life_date: '2027-10-30', notes: 'Intel Core i7, 16GB RAM, 512GB SSD' },
      { type: 'Laptop', model: 'Razer Blade 15', serial_number: 'RB15-001', purchase_date: '2023-04-15', end_of_life_date: '2028-04-15', notes: 'Intel Core i7, 16GB RAM, 1TB SSD' },
      { type: 'Laptop', model: 'Samsung Galaxy Book Flex', serial_number: 'SGBF-002', purchase_date: '2022-09-30', end_of_life_date: '2027-09-30', notes: 'Intel Core i7, 16GB RAM, 512GB SSD' }
    ])
  })

 // Inserts help_desk_users seed entries
  .then(() => {
    return knex('tickets').insert([
      {
        assigned_to: 2,
        equipment_id: 1,
        status: 'Open',
        description: 'Laptop not booting up',
        customer_name: 'John Doe',
        customer_email: 'john.doe.22@spaceforce.mil',
        create_date: '2024-04-01',
        date_completed: null,
        priority_level_id: 3,
        ticket_type_id: 1
      },
      {
        assigned_to: 3,
        equipment_id: 3,
        status: 'In Progress',
        description: 'Server performance degradation',
        customer_name: 'Alice Smith',
        customer_email: 'alice.smith.24@spaceforce.mil',
        create_date: '2024-04-02',
        date_completed: null,
        priority_level_id: 2,
        ticket_type_id: 2
      },
      {
        assigned_to: 4,
        equipment_id: 5,
        status: 'Open',
        description: 'PC overheating issue',
        customer_name: 'Bob Johnson',
        customer_email: 'bob.johnson.3@spaceforce.mil',
        create_date: '2024-04-03',
        date_completed: null,
        priority_level_id: 4,
        ticket_type_id: 1
      },
      {
        assigned_to: 5,
        equipment_id: 7,
        status: 'Open',
        description: 'Laptop screen flickering',
        customer_name: 'Eva Green',
        customer_email: 'eva.green.6@spaceforce.mil',
        create_date: '2024-04-04',
        date_completed: null,
        priority_level_id: 3,
        ticket_type_id: 1
      },
      {
        assigned_to: 2,
        equipment_id: 10,
        status: 'Open',
        description: 'Server connection issues',
        customer_name: 'Michael Brown',
        customer_email: 'michael.brown.36@spaceforce.mil',
        create_date: '2024-04-05',
        date_completed: null,
        priority_level_id: 2,
        ticket_type_id: 2
      }
    ])
  })

 // Inserts help_desk_users seed entries
  .then(() => {
    return knex('ticket_updates').insert([
      // Ticket 1 updates
      { help_desk_users_id: 2, ticket_id: 1, body: 'Investigated the issue.', date_created: '2024-04-01T12:30:00' },
      { help_desk_users_id: 3, ticket_id: 1, body: 'Replaced faulty RAM.', date_created: '2024-04-01T12:30:00' },
      { help_desk_users_id: 2, ticket_id: 1, body: 'Confirmed issue resolved.', date_created: '2024-04-01T12:30:00' },

      // Ticket 2 updates
      {help_desk_users_id: 3, ticket_id: 2, body: 'Investigating server performance.', date_created: '2024-04-02 12:30:00' },
      { help_desk_users_id: 3, ticket_id: 2, body: 'Optimized server settings.', date_created: '2024-04-02 12:30:00' },

      // Ticket 3 updates
      { help_desk_users_id: 4, ticket_id: 3, body: 'Checking cooling system for PC.', date_created: '2024-04-03 12:30:00' },

      // Ticket 4 updates
      { help_desk_users_id: 5, ticket_id: 4, body: 'Inspecting display cables.', date_created: '2024-04-04 12:30:00' },

      // Ticket 5 updates
      { help_desk_users_id: 2, ticket_id: 5, body: 'Checking network configuration for server.', date_created: '2024-04-05 12:30:00' },
      { help_desk_users_id: 5, ticket_id: 5, body: 'Confirmed network issue.', date_created: '2024-04-05 12:30:00' },
      { help_desk_users_id: 2, ticket_id: 5, body: 'Restarted server services.', date_created: '2024-04-05 12:30:00' },
      { help_desk_users_id: 5, ticket_id: 5, body: 'Issue resolved.', date_created: '2024-04-05 12:30:00' }
    ])
  })
};