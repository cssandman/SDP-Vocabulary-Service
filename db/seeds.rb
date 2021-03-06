# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Setup single user for testing:

ResponseType.find_or_create_by code: 'boolean', name: 'Boolean',
                               description: 'Answer is a yes/no answer.'
ResponseType.find_or_create_by code: 'decimal', name: 'Decimal',
                               description: 'Answer is a floating point number.'
ResponseType.find_or_create_by code: 'integer', name: 'Integer',
                               description: 'Answer is an integer.'
ResponseType.find_or_create_by code: 'date', name: 'Date',
                               description: 'Answer is a date.'
ResponseType.find_or_create_by code: 'dateTime', name: 'Date Time',
                               description: 'Answer is a date and time.'
ResponseType.find_or_create_by code: 'instant', name: 'Instant',
                               description: 'Answer is a system timestamp.'
ResponseType.find_or_create_by code: 'time', name: 'Time',
                               description: 'Answer is a time (hour/minute/second) independent of date.'
ResponseType.find_or_create_by code: 'string', name: 'String',
                               description: 'Answer is a short (few words to short sentence) free-text entry.'
ResponseType.find_or_create_by code: 'text', name: 'Text',
                               description: 'Answer is a long (potentially multi-paragraph) free-text entry (still captured as a string).'
ResponseType.find_or_create_by code: 'url', name: 'Url',
                               description: 'Answer is a url (website, FTP site, etc.).'
ResponseType.find_or_create_by code: 'choice', name: 'Choice',
                               description: 'Answer is a Coding drawn from a list of options.'
ResponseType.find_or_create_by code: 'open-choice', name: 'Open Choice',
                               description: 'Answer is a Coding drawn from a list of options or a free-text entry.'
ResponseType.find_or_create_by code: 'attachment', name: 'Attachment',
                               description: 'Answer is binary content such as a image, PDF, etc.'
ResponseType.find_or_create_by code: 'reference', name: 'Reference',
                               description: 'Answer is a reference to another resource (practitioner, organization, etc.).'
ResponseType.find_or_create_by code: 'quantity', name: 'Quantity',
                               description: 'Answer is a combination of a numeric value and unit, potentially with a comparator (<, >, etc.).'

Category.find_or_create_by name: 'Demographics'
Category.find_or_create_by name: 'Clinical'
Category.find_or_create_by name: 'Treatment'
Category.find_or_create_by name: 'Laboratory'
Category.find_or_create_by name: 'Vaccine'
Category.find_or_create_by name: 'Screening'
epid = Category.find_or_create_by name: 'Epidemiological'
ep = Category.find_or_create_by name: 'Public Health Emergency Preparedness & Response'

Subcategory.find_or_create_by name: 'Managing & Commanding', category: ep
Subcategory.find_or_create_by name: 'Operations', category: ep
Subcategory.find_or_create_by name: 'Planning/Intelligence', category: ep
Subcategory.find_or_create_by name: 'Logistics', category: ep
Subcategory.find_or_create_by name: 'Financial/Administration', category: ep

Subcategory.find_or_create_by name: 'Travel', category: epid
Subcategory.find_or_create_by name: 'Contact or Exposure', category: epid
Subcategory.find_or_create_by name: 'Drug Abuse', category: epid
Subcategory.find_or_create_by name: 'Sexual Behavior', category: epid
