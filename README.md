# Räkkeri

Räkkeri is an online time tracking application for University of Helsinki Computer Science students (and anyone else who finds it useful). Räkkeri saves time on documenting your project hours. It produces **Markdown hour reports** that are ideal for Helsinki University Computer Science projects.

_Rakkeri was done as a 175-hour solo project for the University of Helsinki (Full-Stack Project, 10 cr)._

## Tech stuff

- Front end
  - React, Material UI
- Back end
  - Java Spring Boot REST API
  - JWT token authentication
  - JPA Object Relational Model
- Data store
  - Postgresql
- DevOps
  - Build and Deploy to staging with GitHub Actions

## Documentation

- [Hours spent on project (175 + making video tutorial)](https://github.com/hajame/rakkeri/blob/main/docs/working_hours.md)
- [Privacy policy statement](https://github.com/hajame/rakkeri/blob/main/docs/working_hours.md)
- [Local environment setup](https://github.com/hajame/rakkeri/blob/main/docs/local_environment.md)


## Where is it?

* Only development build available: [Local environment setup](https://github.com/hajame/rakkeri/blob/main/docs/local_environment.md)
* The old staging deployment is no longer available (was https://ohtup-staging.cs.helsinki.fi/rakkeri).
    * The production build contains hard-coded configurations to the staging server, which is why modifications are needed to run this elsewhere.


## Here's a video tutorial of Räkkeri!

https://user-images.githubusercontent.com/32326389/170817282-0edd9e87-a5f8-4bc4-a280-968bb32042b6.mp4

## User guide

### Tracking workflow

1. Create a `project` for time tracking
2. Start tracking time for a `task` (e.g. "Create walking skeleton for Todo App")
3. When your hours are tracked, create a report in _Markdown format_.
4. Copy and paste the report to your hour report in Github/GitLab.
5. Rinse and repeat. Update your hours daily or at the end of the project, up to you.

### Reporting

Räkkeri can produce a report that is commonly used for project work at the Computer Science programme at the University of Helsinki.

Multiple recordings of a tracking like `Writing documentation` are combined if they occur during the same day.

#### Example

Report output Markdown:

```
|    Date    | hh:mm:ss | Task              |
| :--------: | -------: | :---------------- |
| 2022-04-28 | 01:34:01 | Plan requirements |
|            | 01:00:59 | Write README      |
| 2022-05-04 | 01:34:34 | Plan requirements |
|            | 03:17:05 | Build Web app     |
|   TOTAL    | 05:57:49 |                   |
```

When copypasted to Github/Gitlab other, it renders like this:

|    Date    | hh:mm:ss | Task              |
| :--------: | -------: | :---------------- |
| 2022-04-28 | 01:34:01 | Plan requirements |
|            | 01:00:59 | Write README      |
| 2022-05-04 | 01:34:34 | Plan requirements |
|            | 03:17:05 | Build Web app     |
|   TOTAL    | 05:57:49 |                   |
