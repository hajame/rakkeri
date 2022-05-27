# Räkkeri

Räkkeri is an online time tracking application for University of Helsinki Computer Science students (and anyone else who finds it useful).

It produces **Markdown hour reports** that are ideal for Helsinki University Computer Science projects.

## Where is it?

[https://ohtup-staging.cs.helsinki.fi/rakkeri](https://ohtup-staging.cs.helsinki.fi/rakkeri) - go ahead and try it!

## What is it good for?

Räkkeri saves time on documenting your HY project hours so you have more time to do _anything else_.

### Here's one possible workflow

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

## Documentation

- [Hours spent on project](https://github.com/hajame/rakkeri/blob/main/docs/working_hours.md)
- [Privacy policy statement](https://github.com/hajame/rakkeri/blob/main/docs/working_hours.md)

## Tech stuff

- Front end
  - React, Material UI
- Back end
  - Spring Boot REST API
  - JWT token authentication
  - JPA Object Relational Model
- Data store
  - Postgresql
