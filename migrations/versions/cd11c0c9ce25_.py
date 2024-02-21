"""empty message

Revision ID: cd11c0c9ce25
Revises: e0140ad61c87
Create Date: 2024-02-21 18:52:58.325828

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cd11c0c9ce25'
down_revision = 'e0140ad61c87'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('session', schema=None) as batch_op:
        batch_op.add_column(sa.Column('url_imagen', sa.String(length=250), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('session', schema=None) as batch_op:
        batch_op.drop_column('url_imagen')

    # ### end Alembic commands ###